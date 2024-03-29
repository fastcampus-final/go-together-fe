import React, { useEffect, useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { uploadImage } from '@/apis/common';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
const WysiwygEditor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  },
);

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ htmlStr, setHtmlStr }: IEditor) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlStr);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadCallback = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const url = await uploadImage(file, 'review');

        resolve({ data: { link: url } });
      };

      reader.readAsDataURL(file);
    });
  };

  // toolbar 설정
  const toolbar = {
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
    image: { uploadCallback: uploadCallback }, // 이미지 커스텀 업로드
  };

  // 언어 설정
  const localization = {
    locale: 'ko',
  };

  return (
    <WysiwygEditor
      editorClassName="editor" // Editor 적용 클래스
      toolbarClassName="toolbar" // Toolbar 적용 클래스
      toolbar={toolbar}
      placeholder="내용을 입력하세요."
      localization={localization}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{ height: '500px' }}
    />
  );
};

export default Editor;
