import { LitElement, html, css } from "lit";

class MyCounter extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      max-width: 200px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: sans-serif;
    }
    .count {
      font-size: 2rem;
      margin: 10px 0;
      color: #3b82f6;
    }
    button {
      padding: 8px 16px;
      cursor: pointer;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: #2563eb;
    }
  `;

  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  _increment() {
    this.count += 1;
  }

  render() {
    return html`
      <div>The Current Count:</div>
      <div class="count">${this.count}</div>
      <button @click="${this._increment}">Increment</button>
    `;
  }
}

customElements.define("x-counter", MyCounter);
