import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(posts); // JSON 응답 반환
}
