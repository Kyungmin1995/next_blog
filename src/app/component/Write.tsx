"use client";
import { Button, ButtonGroup, Fab, TextField } from "@mui/material";
import style from "./write.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useRef, useState } from "react";
import { storage, db } from "../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
interface createdAtProps {
  createdAt?: { seconds: number; nanoseconds: number };
}
interface PostDataProps extends createdAtProps {
  id: string;
  title: string;
  content: string;
  imageUrl: File | null;
}
export default function Write() {
  const store = useAppSelector((state) => state.menuReducer);
  console.log(store, "store");

  const router = useRouter();
  const [postData, setPostData] = useState<PostDataProps>({
    id: "",
    title: "",
    content: "",
    createdAt: { seconds: 0, nanoseconds: 0 },
    imageUrl: null,
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const onChagneData = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostData((state) => ({
      ...state,
      [value]: e.target.value,
    }));
  };
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 미리보기 이미지 상태 추가

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // 선택한 파일을 상태에 저장
      setPostData((prev) => ({
        ...prev,
        imageUrl: file, // file을 상태에 저장
      }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl); // 미리보기 상태 업데이트
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsUploading(true);
    if (postData.title === "" && postData.content === "") return;
    try {
      let imageUrl = "";
      if (postData.imageUrl instanceof File) {
        // 이미지가 있을 경우 Firebase Storage에 업로드
        const imageRef = ref(storage, `uploads/${postData.imageUrl.name}`);
        const uploadResult = await uploadBytes(imageRef, postData.imageUrl);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      // Firestore에 제목, 내용, 이미지 URL을 포함한 데이터 저장
      await addDoc(collection(db, "posts"), {
        title: postData.title,
        content: postData.content,
        imageUrl: imageUrl || "", // 이미지 URL이 없으면 빈 문자열 저장
        createdAt: new Date(),
      });

      // 성공적으로 업로드 후 상태 초기화
      setPostData({
        id: "",
        title: "",
        content: "",
        createdAt: { seconds: 0, nanoseconds: 0 },
        imageUrl: null,
      });
      setPreviewImage(null); // 미리보기 초기화
      console.log("Post saved successfully");
      router.push("/");
    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setPreviewImage(null); // 미리보기 이미지 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 기존 파일 선택 값 초기화
    }
  };

  return (
    <>
      <div className={style.writeContainer}>
        <div className={style.writeInputBox}>
          <TextField
            id="standard-basic"
            label="제목"
            variant="standard"
            required
            value={postData.title}
            onChange={(e) => {
              onChagneData("title", e);
            }}
          />
          <TextField
            id="standard-basic"
            label="내용"
            variant="standard"
            required
            value={postData.content}
            onChange={(e) => {
              onChagneData("content", e);
            }}
          />
        </div>
        <div>
          <div className={style.contentBox}>
            {previewImage && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 200, height: 200 }}
                />
              </div>
            )}
            {previewImage ? (
              <div className={style.contentAdd}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }} // 파일 input 숨김
                />
                <Fab
                  color="secondary"
                  aria-label="edit"
                  onClick={handleDeleteImage}
                  sx={{
                    width: { xs: 56, md: 72 },
                    height: { xs: 56, md: 72 },
                  }}
                >
                  <DeleteIcon
                    sx={{ fontSize: { xs: 24, md: 32 } }} // 아이콘 크기 변경
                  />
                </Fab>
              </div>
            ) : (
              <div className={style.contentAdd}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }} // 파일 input 숨김
                />

                <Fab
                  color="secondary"
                  aria-label="edit"
                  onClick={handleDivClick}
                  sx={{
                    width: { xs: 56, md: 72 },
                    height: { xs: 56, md: 72 },
                  }}
                >
                  <AddIcon
                    sx={{ fontSize: { xs: 24, md: 32 } }} // 아이콘 크기 변경
                  />
                </Fab>
              </div>
            )}
          </div>
        </div>
        <div>
          <ButtonGroup
            variant="outlined"
            aria-label="Loading button group"
            style={{ justifyContent: "center", display: "flex", gap: 0 }}
          >
            <LoadingButton
              disabled={postData.title === "" || postData.content === ""}
              loading={isUploading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>
            <Button onClick={() => router.back()}>Close</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
