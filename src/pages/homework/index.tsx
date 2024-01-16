import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Homework() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  console.log(editorRef.current);
  return (
    <div className="w-full h-full max-w-5xl p-4 md:p-8 flex flex-col items-center justify-start gap-4">
      <Editor
        apiKey="p85sl6nh69812efooa9cfp8o819sklcewunmeqbe17i62hac"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          plugins:
            "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
      />
      <button onClick={log}>
        <p>숙제 제출</p>
      </button>
    </div>
  );
}
