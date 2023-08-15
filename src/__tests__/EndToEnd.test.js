import puppeteer from "puppeteer"

describe("show/hide an event details", () => {
    test("An event element is collapsed by default", async () => {
        //launch browser
        const browser = await puppeteer.launch();

        // create new page and navigate to locally hosted app
        const page = await browser.newPage();
        await page.goto("http://localhost:3000/");

        // select event element once it appears
        await page.waitForSelector(".event");

        const eventDetails = await page.$(".event-details");
        expect(eventDetails).toBeNull();
        browser.close();
    });

    test("User can expand an event to see its details", async () => {
        // simulate opening browser and application
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("http://localhost:3000/");

        // simulate user clicking on the details button
        await page.waitForSelector(".event");
        await page.click(".details-btn");

        const eventDetails = await page.$(".details-btn");
        expect(eventDetails).toBeDefined();
        browser.close();
    });
})