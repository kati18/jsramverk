/**
 * Functional/UI tests for frontend application me-angular.
 */
"use strict";

const assert = require("assert");
// wraps Mocha so it does not have to be imported:
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

let browser;


// Test suite "Me-app"
test.describe("Me-app", function() {
    // does something before execution of each test case in the test suite:
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        // Sets the starting url in browser when the testing begins:
        // browser.get("http://localhost:8084/app/");
        browser.get("http://localhost:8084/");
        done();
    });
    // does something after execution of each test case in the test suite:
    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    async function goToNavLink(target) {
        // console.log("target från goToNavLink: ", target);
        await browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            // console.log("url från matchUrl: ", url);
            // console.log("target från matchUrl: ", target);
            // console.log("url från matchUrl: ", url);
            assert.ok(url.endsWith(target));
        });
    }


    function assertByElement(target, elToAssert) {
        // console.log("target från assertByElement", target);
        browser.findElement(By.css(elToAssert)).then(function(element) {
            element.getText().then(function(text) {
                // console.log("text från assertByElement: ", text);
                assert.equal(text, target);
            });

            // console.log("utanför getText");
        });
    }


    function assertById(target, idToFind) {
        // console.log("target från assertById", target);
        // console.log("idToFind från assertById", idToFind);
        browser.findElement(By.id(idToFind)).then(async function(element) {
            await element.getText().then(function(text) {
                // console.log("text från assertById: ", text);
                assert.equal(text, target);
            });
            // console.log("utanför getText");
        });
    }

    // Test case "Test to go to Index":
    test.it("Test to go to Index", function(done) {
        browser.getTitle().then(function(title) {
                assert.equal(title, "MeAngular");
            }).then(function() {
                    assertByElement("My First Angular App in course jsramverk", "h1");
            }).then(function() {
                    matchUrl("/");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Reports":
    test.it("Test to go to Reports", function(done) {
        goToNavLink("Reports");
        browser.getTitle().then(function(title) {
                assert.equal(title, "MeAngular");
            }).then(function() {
                    assertById("My reports", "report-title");
            }).then(function() {
                    assertByElement("If you want to edit and/or add a text you need to be " +
                             "registered and logged in.", "h3");
            }).then(function() {
                    matchUrl("/reports");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Me":
    test.it("Test to go to Me", function(done) {
        goToNavLink("Me");
        browser.getTitle().then(function(title) {
                assert.equal(title, "MeAngular");
            }).then(function() {
                    assertById("This is me:", "me-title");
            }).then(function() {
                    matchUrl("/");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Register":
    test.it("Test to go to Register", function(done) {
        goToNavLink("Register");
        browser.getTitle().then(function(title) {
                assert.equal(title, "MeAngular");
            }).then(function() {
                    assertById("Welcome to register!", "register-title");
            }).then(function() {
                    matchUrl("/register");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test to go to Login":
    test.it("Test to go to Login", function(done) {
        goToNavLink("Login");
        browser.getTitle().then(function(title) {
                assert.equal(title, "MeAngular");
            }).then(function() {
                    assertById("Welcome to login!", "login-title");
            }).then(function() {
                    matchUrl("/login");
            }).then(function() {
                    done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test if button for registration is enabled":
    test.it("Test if button for registration is enabled", function(done) {
        goToNavLink("Register");

        let promiseInputs = browser.findElements(By.className("register-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("fakePassword");
        });

        browser.findElement(By.className("register-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, true);
            });
        });

        done();
    });


    // Test case "Copy test if button for registration is enabled":
    test.it("Copy Test if button for registration is enabled", function(done) {
        goToNavLink("Register");

        browser.findElements(By.className("register-input")).then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("fakePassword");
            }).then(function() {
                browser.findElement(By.className("register-button")).then(function(buttonElement) {
                    buttonElement.isEnabled().then(function(value) {
                        assert.equal(value, true);
                    })
                })
            }).then(function() {
                done();
            }).catch(function(error) {
                // console.log("Error.message: ", error.message);
            });
    });


    // Test case "Test if button for login is enabled":
    test.it("Test if button for login is enabled", function(done) {
        goToNavLink("Login");

        let promiseInputs = browser.findElements(By.className("login-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("fakePassword");
        });

        browser.findElement(By.className("login-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, true);
            });
        });

        done();
    });


    // Test case "Test if button for registration is enabled when missing @ in email":
    test.it("Test if button for registration is enabled when missing @ in email", function(done) {
        goToNavLink("Register");

        let promiseInputs = browser.findElements(By.className("register-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18test.se");
            inputElements[1].sendKeys("fakePassword");
        });

        browser.findElement(By.className("register-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, false);
            });
        });

        done();
    });


    // Test case "Test if button for registration is enabled when missing password":
    test.it("Test if button for login is enabled when missing password", function(done) {
        goToNavLink("Login");

        let promiseInputs = browser.findElements(By.className("login-input"));

        promiseInputs.then(function(inputElements) {
            // console.log("inputElements: ", inputElements);
            inputElements[0].sendKeys("katja.18@test.se");
            inputElements[1].sendKeys("");
        });

        browser.findElement(By.className("login-button")).then(function(buttonElement) {
            buttonElement.isEnabled().then(function(value) {
                assert.equal(value, false);
            });
        });

        done();
    });


    // Test case "Test to ensure report kmom03 is fetched":
    test.it("Test to ensure report kmom03 is fetched", function(done) {
        goToNavLink("Reports");

        let text = "Kmom 03";

        browser.findElement(By.id("3")).then(function(reportElement) {
            reportElement.getText().then(function(reportText) {
                // console.log("reportText: ", reportText);
                // console.log("text: ", text);
                assert.equal(reportText, text);
            });
        }).then(function() {
            done();
        }).catch(function(error) {
            // console.log("Error.message: ", error.message);
        });
    });


    // Added 201126 kl 12.10: Test case "Test to ensure report kmom03 is fetched":
    test.it("Copy test to ensure report kmom03 is fetched", async function(done) {
        goToNavLink("Reports");

        let text = "Kmom 03";

        await browser.findElement(By.id("3")).then(async function(reportElement) {
            await reportElement.getText().then(async function(reportText) {
                // console.log("reportText: ", reportText);
                // console.log("text: ", text);
                await assert.equal(reportText, text);
            });
        });

        done();
    });


    // Added 201126 kl 12.10: Test case "Test to ensure me is fetched":
    test.it("Test to ensure me info is fetched", async function(done) {
        goToNavLink("Me");

        await browser.findElement(By.id("me-description")).then(async function(descrElement) {
            await descrElement.getText().then(async function(meText) {
                // console.log("reportText: ", meText);
                await assert.ok(meText.startsWith("Tjänstledig småländsk"));
                await assert.ok(meText.endsWith("film och hockey."));
            });
        });

        done();
    });

});
