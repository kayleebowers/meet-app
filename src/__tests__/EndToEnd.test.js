import puppeteer from "puppeteer"

describe("show/hide an event details", () => {
    let browser;
    let page;

    beforeAll(async () => {
        //launch browser and load new page
        browser = await puppeteer.launch();
        page = await browser.newPage();

        //navigate to locally hosted app 
        await page.goto("http://localhost:3000/");

        // select event element once it appears
        await page.waitForSelector(".event");
    });

    afterAll(async () => {
        browser.close();
    });

    test("An event element is collapsed by default", async () => {
        const eventDetails = await page.$(".event-details");
        expect(eventDetails).toBeNull();
    });

    test("User can expand an event to see its details", async () => {
        // simulate user clicking on the details button
        await page.click(".details-btn");

        const eventDetails = await page.$(".event-details");
        expect(eventDetails).toBeDefined();
    });
})