/// <reference types="Cypress" />

describe('Download File and Assert the content', () => {
    it('Download & Extract Text', () => {
        cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', 'mydownloads', 'example.jpg')
            .then(() => {
                cy.task("getImageText", { fileName: "./mydownloads/example.jpg", lang: "eng", logger: false })
                    .then(text => {
                        expect(text).to.contains("Are you enjoying Cypress")
                    })
            })
    });

    it('Download & Compare Images', () => {
        cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', 'mydownloads', 'example.jpg')
            .then(() => {
                cy.task("compareImages", { fileName1: "./mydownloads/example.jpg", fileName2: "DifferentImage.jpg" })
                    .then(isMatching => {
                        expect(isMatching).to.be.true;
                    })
            })
    });
});