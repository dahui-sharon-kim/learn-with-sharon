import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Homework() {
  const editorRef = useRef<Editor | null>(null);
  const log = () => {
    if (editorRef.current) {
      // @ts-expect-error : This error is caused by @tinymce itself
      console.log(editorRef.current.getContent());
    }
  };
  console.log(editorRef.current);
  return (
    <div className="w-full h-full max-w-5xl p-4 md:p-8 flex flex-col items-center justify-start gap-4">
      <Editor
        apiKey="p85sl6nh69812efooa9cfp8o819sklcewunmeqbe17i62hac"
        onInit={(_evt, editor) => {
          editorRef.current = editor as unknown as Editor;
          return;
        }}
        init={{
          plugins:
            "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize forecolor backcolor | bold italic underline strikethrough | link image media | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          backcolor_map: ["ddd6fe", "violet200", "fed7aa", "orange200", "bbf7d0", "green200", "bfdbfe", "blue200"],
          textcolor_map: ["ddd6fe", "violet200", "fed7aa", "orange200", "bbf7d0", "green200", "bfdbfe", "blue200"],
        }}
      />
      <button onClick={log}>
        <p>제출</p>
      </button>
    </div>
  );
}
