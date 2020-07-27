import "/node_modules/@patternfly/pfe-band/dist/pfe-band.min.js";
import "/node_modules/@patternfly/pfe-card/dist/pfe-card.min.js";

const getRandomFacts = facts => {
  const numFacts = 12;
  const array = facts.all;
  
  // shuffle the array
  // Fisher-Yates algorithm
  // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array.slice(0, numFacts);
}

const showFacts = facts => {
  const container = document.querySelector("#facts-container");
  const fragment = document.createDocumentFragment();

  facts.forEach((fact, index) => {
    const catFact = document.createElement("cat-fact");
    catFact.textContent = fact.text;
    catFact.setAttribute("number", index + 1);
    fragment.appendChild(catFact);
  });

  container.appendChild(fragment);
}

fetch("https://cat-fact.herokuapp.com/facts")
  .then(res => res.json())
  .then(getRandomFacts)
  .then(showFacts)
  .catch(err => console.error(err));

class CatFact extends HTMLElement {
  static get observedAttributes() {
    return ["number"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this._randomNumber = Math.floor(Math.random() * 1000);
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --pfe-card__header--BackgroundColor: #000063;
          --pfe-card__header--Color: #fff;
          --pfe-card--Border: 1px solid #eee;
          display: flex;
        }
      </style>
      <pfe-card pfe-color="lightest">
        <h2 slot="pfe-card--header">Fact #<span id="number"></span></h2>
        <img pfe-overflow="top right left" id="image">
        <p>
          <slot></slot>
        </p>
      </pfe-card>
    `;

    this._number = this.shadowRoot.querySelector("#number");
    this._image = this.shadowRoot.querySelector("#image");
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this._number.textContent = newVal;
    this._image.src = `/images/cat-${newVal}.webp`;
  }
}

window.customElements.define("cat-fact", CatFact);

// register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(registration => {
      console.log("Service Worker registation was successful", registration);
    })
    .catch(error => console.log("Service Worker registration failed", error));
}