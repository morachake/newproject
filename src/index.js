import React from "react";
import ReactDOM from "react-dom";
import PortableText from "@sanity/block-content-to-react";
import urlBuilder from "@sanity/image-url";
import doc from "./doc.json";
import "./styles.css";
import SyntaxHighlighter from "react-syntax-highlighter";

const urlFor = source =>
  urlBuilder({ projectId: "uip7l8ai", dataset: "production" }).image(source);

  const serializer = {
    types: {
      mainImage: (props) => (
        <figure>
          <img
            src={urlFor(props.node.asset).width(600).url()}
            alt={props.node.alt}
          />
          <figcaption>{props.node.caption}</figcaption>
        </figure>
      ),
      code: (props) => {
        if (props.node && props.node.code && props.node.language) {
          return (
            <SyntaxHighlighter language="props.node.language">
              {props.node.code}
            </SyntaxHighlighter>
          );
        } else {
          return null;
        }
      },
      image: (props) => (
        <figure>
          <img
            src={urlFor(props.node.asset._ref).width(600).url()}
            alt={props.node.alt}
          />
        </figure>
      ),
    },
  };

function App() {
  return (
    <div className="App">
      <PortableText blocks={doc.body} serializers={serializer} />
      <hr />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
