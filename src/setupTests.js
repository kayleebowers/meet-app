import '@testing-library/jest-dom';

//add portions of warning messages you don't want appearing
const MESSAGES_TO_IGNORE = [
    "When testing, code that causes React state updates should be wrapped into act(...):",
    "Error:",
    "The above error occurred"
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
    const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
    if (ignoreMessage) originalError(...args);
}

// add time so test doesn't time out
jest.setTimeout(60000); 

// resolve window.ResizeObserver is not a constructor error
const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});