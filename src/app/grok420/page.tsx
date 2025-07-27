"use client";

import { SupermemoryProvider } from "../../components/grok420/SupermemoryIntegration";
import Grok420Content from "../../components/grok420/Grok420Content";

export default function Grok420Page() {
  return (
    <SupermemoryProvider>
      <Grok420Content />
    </SupermemoryProvider>
  );
}
