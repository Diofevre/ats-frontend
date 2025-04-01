'use client'

import { useParams } from 'next/navigation';
import PostCariereDetails from '../_components/PCDetails';

export default function PostCariereDetailsPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  return <PostCariereDetails id={id} />;
}