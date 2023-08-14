import puppeteer from "puppeteer"

describe("show/hide an event details", () => {
    test("An event element is collapsed by default", async () => {
        //launch browser
        const browser = await puppeteer.launch();

        // create new page and navigate to locally hosted app
        const page = await browser.newPage();
        await page.goto("http://localhost:3000/");

        // select event element
        await page.waitForSelector(".event");

        const eventDetails = await page.$(".event-details");
        expect(eventDetails).toBeNull();
        browser.close();
    })
})