import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import MacWindow from "./MacWindow";
import './note.scss';
import remarkGfm from "remark-gfm";

const Note = ({windowName, windowState, setwindowState, minimized, layout, onLayoutChange, zIndex, onFocus}) => {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const res = await fetch("/notes.txt");

        if (!res.ok) {
          throw new Error("Failed to load notes");
        }

        const text = await res.text();
        setMarkdown(text);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, []);

  return (
    <MacWindow windowName={windowName} windowState={windowState} setwindowState={setwindowState} minimized={minimized} layout={layout} onLayoutChange={onLayoutChange} zIndex={zIndex} onFocus={onFocus}>
      <div className="note-window">
      <img src="./Background.jpg" alt="" />
        {loading && <p>Loading notes...</p>}

        {error && <p>Failed to load notes.</p>}

        {!loading && !error && (
          <Markdown remarkPlugins={[remarkGfm]}
            components={{
              // Ensure markdown maps cleanly to your SCSS
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote>{children}</blockquote>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code>{children}</code>
                ) : (
                  <pre>
                    <code>{children}</code>
                  </pre>
                ),
              table: ({ children }) => <table>{children}</table>,
              hr: () => <hr />
            }}
          >
            {markdown}
          </Markdown>
        )}
      </div>
    </MacWindow>
  );
};

export default Note;
