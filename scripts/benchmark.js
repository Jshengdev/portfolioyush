import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES = [
    '/',
    '/about',
    '/projects',
    '/archive',
    '/contact',
    '/projects/Grove',
    '/projects/CapsuleMachine',
    '/projects/Lens',
    '/projects/TheCollection',
    '/projects/NextProject',
    '/projects/Ark',
    '/projects/AlainaPamela'
];

const BASE_URL = 'http://localhost:3000'; // Assuming Vite dev server
const OUTPUT_DIR = path.join(__dirname, '../docs/research');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
const DATA_DIR = path.join(OUTPUT_DIR, 'data');

// Ensure directories exist
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const mode = process.argv[2] || 'test'; // 'before', 'after', or 'test'

async function runBenchmark() {
    console.log(`Starting benchmark in mode: ${mode}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set viewport to a standard desktop size
    await page.setViewport({ width: 1920, height: 1080 });

    const results = {};

    const routesToTest = mode === 'test' ? ['/'] : ROUTES;

    for (const route of routesToTest) {
        console.log(`Testing route: ${route}`);
        const url = `${BASE_URL}${route}`;

        // Measure Load Time
        const startLoad = performance.now();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const endLoad = performance.now();
        const loadTime = endLoad - startLoad;

        // Wait a bit for animations to settle/start
        await new Promise(r => setTimeout(r, 2000));

        // Measure FPS
        const fps = await page.evaluate(async () => {
            return new Promise(resolve => {
                let frames = 0;
                const startTime = performance.now();

                function loop() {
                    frames++;
                    const currentTime = performance.now();
                    if (currentTime - startTime >= 1000) {
                        resolve(frames);
                    } else {
                        requestAnimationFrame(loop);
                    }
                }
                requestAnimationFrame(loop);
            });
        });

        // Capture Screenshot
        const safeRouteName = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
        const screenshotPath = path.join(SCREENSHOTS_DIR, `${mode}_${safeRouteName}.png`);
        await page.screenshot({ path: screenshotPath });

        results[route] = {
            loadTime,
            fps,
            screenshot: screenshotPath
        };

        console.log(`  FPS: ${fps}, Load: ${loadTime.toFixed(2)}ms`);
    }

    await browser.close();

    // Save results
    const resultsPath = path.join(DATA_DIR, `metrics_${mode}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`Results saved to ${resultsPath}`);
}

runBenchmark().catch(console.error);
