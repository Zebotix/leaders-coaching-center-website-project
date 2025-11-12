'use client';
import React from 'react';
import { Button } from './ui/button';

export default function ReloadButton() {
  return (
    <Button variant='outline' onClick={() => window.location.reload()}>
      Retry
    </Button>
  );
}
