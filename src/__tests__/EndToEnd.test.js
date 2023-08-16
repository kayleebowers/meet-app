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

    test("User can collapse an event to hide details", async () => {
        await page.click(".details-btn");
        const eventDetails = await page.$(".event-details");
        expect(eventDetails).toBeNull();
    })
})

describe("filter events by city", () => {
    let browser;
    let page;
    let eventList;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        eventList = await page.$("#event-list");
    });

    afterAll(async () => {
        browser.close();
    });

    test("display list of events when app opens", async () => {
        expect(eventList).toBeDefined();
    });

    let textBox;
    let suggestions;
    test("user should see recommended cities when they type in textbox", async () => {
        // simulate typing in textbox
        textBox = await page.$(".city");
        await textBox.type("Berlin");
        suggestions = await page.$(".suggestions");
        expect(suggestions).toBeTruthy();
        // clear textBox for next test
        await textBox.click({clickCount: 3});
        await textBox.press('Backspace');
    });

    test("when user clicks on city they will see events in that city", async () => {
        await suggestions.evaluate(suggestion => suggestion.click());
        expect(eventList).toHaveLength(33);
    })
})