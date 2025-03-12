"use client";
import { useState } from "react";
import Tab from "./Tab";

export default function Home() {
  const [value, setValue] = useState("tab1");
  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center w-[500px]">
        <Tab value={value} onValueChange={setValue}>
          <Tab.trigger value="tab1">شماره یک</Tab.trigger>
          <Tab.trigger value="tab2">شماره دو</Tab.trigger>
          <Tab.trigger value="tab3">شماره سه</Tab.trigger>
          <Tab.trigger value="tab4">شماره چهار</Tab.trigger>

          <Tab.content value="tab1">تست محتویات تب شماره اول</Tab.content>
          <Tab.content value="tab2">تست محتویات تب شماره دوم</Tab.content>
          <Tab.content value="tab3">تست محتویات تب شماره سوم</Tab.content>
          <Tab.content value="tab4">تست محتویات تب شماره چهارم</Tab.content>
        </Tab>
      </div>
    </div>
  );
}
