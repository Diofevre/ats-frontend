'use client'

import { useParams } from "next/navigation";
import PostCarieresList from "./_components/PCList";

export default function PostCarieresPage() {
  const params = useParams();
  const organizationId = parseInt(params.id as string);


  return <PostCarieresList organizationId={organizationId} />;
}