import React from 'react';

export default async function Material({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <div>{slug}</div>;
}
