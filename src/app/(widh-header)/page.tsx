// export const dynamic = "force-dynamic";
// export const dynamic = "force-static";

import EditIcon from "@mui/icons-material/Edit";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";

interface PostData {
  id: string;
  imageUrl: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
  title: string;
}

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    cache: "no-store", // SSR 캐시없이 계속 요청
    // cache: "force-cache", // 요청결과 캐시 계속 요청 //한번 호출 이후 다시 호출 안됨
    // next: { revalidate: 5 }, // ISR 활성화
    // next: { tags: ["collection"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function Home() {
  const posts: PostData[] = await getPosts();

  return (
    <div className="container">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 모바일에서는 한 줄에 하나씩
            sm: "repeat(2, 1fr)", // 작은 화면에서는 두 개씩
            md: "repeat(3, 1fr)", // 중간 화면에서는 세 개씩
          },
          gap: 2, // 카드 간 간격
        }}
      >
        {posts.map((_) => (
          <Card key={_.id}>
            <CardMedia
              sx={{ height: 140 }}
              image={_.imageUrl}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {_.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {_.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">더 보기</Button>
              <Button size="small">수정</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Link href="/write">
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: { xs: 16, md: 32 },
              right: { xs: 16, md: 32 },
              width: { xs: 56, md: 72 },
              height: { xs: 56, md: 72 },
            }}
          >
            <EditIcon
              sx={{ fontSize: { xs: 24, md: 32 } }} // 아이콘 크기 변경
            />
          </Fab>
        </Link>
      </div>
    </div>
  );
}
