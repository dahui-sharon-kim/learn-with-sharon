import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";

export default function Homework() {
  const editor: Editor | null = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      Bold,
      Italic,
      Underline,
      Strike,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: "<p></p>",
  });
  const setBold = () => editor?.chain().focus().setBold().run();
  const setItalic = () => editor?.chain().focus().setItalic().run();
  const setStrike = () => editor?.chain().focus().setStrike().run();
  const setUnderline = () => editor?.chain().focus().setUnderline().run();
  const setColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };
  const setHighlight = (color: string) => {
    editor?.chain().focus().toggleHighlight({ color }).run();
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="w-full h-full max-w-5xl p-4 md:p-8 flex flex-col items-center justify-start gap-4">
      <form
        className="w-full p-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(editor?.getHTML());
        }}
      >
        <div className="grid grid-cols-[130px_1fr] [&_button]:border-solid [&_button]:border-[1px] [&_button]:border-slate-500 [&_button]:bg-white [&_button]:rounded [&_button]:px-1.5">
          <p className="text-sm">Text Style</p>
          <div className="flex gap-2">
            <button type="button" className="font-bold" onClick={setBold}>
              Bold
            </button>
            <button type="button" className="underline" onClick={setUnderline}>
              Underline
            </button>
            <button type="button" className="italic" onClick={setItalic}>
              Italic
            </button>
            <button type="button" className="line-through" onClick={setStrike}>
              Strike
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[130px_1fr]">
          <p className="text-sm">Text Color</p>
          <div className="flex gap-2">
            <button type="button" className="text-red-400" onClick={() => setColor("#f87171")}>
              Red
            </button>
            <button type="button" className="text-orange-400" onClick={() => setColor("#fb923c")}>
              Orange
            </button>
            <button type="button" className="text-yellow-500" onClick={() => setColor("#fb923c")}>
              Yellow
            </button>
            <button type="button" className="text-green-400" onClick={() => setColor("#4ade80")}>
              Green
            </button>
            <button type="button" className="text-blue-400" onClick={() => setColor("#60a5fa")}>
              Blue
            </button>
            <button type="button" className="text-violet-400" onClick={() => setColor("#a78bfa")}>
              Violet
            </button>
            <button type="button" className="text-pink-400" onClick={() => setColor("#f472b6")}>
              Pink
            </button>
            <button type="button" className="text-black" onClick={() => setColor("#000")}>
              Remove Color
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[130px_1fr]">
          <p className="text-sm">Highlight</p>
          <div className="flex gap-2">
            <button type="button" className="bg-red-100" onClick={() => setHighlight("#fee2e2")}>
              Red
            </button>
            <button type="button" className="bg-orange-100" onClick={() => setHighlight("#ffedd5")}>
              Orange
            </button>
            <button type="button" className="bg-yellow-100" onClick={() => setHighlight("#fef9c3")}>
              Yellow
            </button>
            <button type="button" className="bg-green-100" onClick={() => setHighlight("#dcfce7")}>
              Green
            </button>
            <button type="button" className="bg-sky-100" onClick={() => setHighlight("#e0f2fe")}>
              Sky
            </button>
            <button type="button" className="bg-violet-100" onClick={() => setHighlight("#ede9fe")}>
              Violet
            </button>
            <button type="button" className="bg-pink-100" onClick={() => setHighlight("#fce7f3")}>
              Pink
            </button>
          </div>
        </div>
        <EditorContent className="p-3 bg-white dark:bg-opacity-20 rounded mt-3" editor={editor} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
