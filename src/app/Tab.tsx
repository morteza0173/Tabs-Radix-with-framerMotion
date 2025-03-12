"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import React, { createContext, useContext } from "react";

interface TabContextProps {
  activeValue: string;
}

const TabContext = createContext<TabContextProps | null>(null);

export default function Tab({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  // این بخش از کد را با کمک چت جی پی نوشتم تا بتونم تریگر و کانتتن را از هم فیلتر کنم و هر کدام را در بخش خودش بذارم
  const triggers = React.Children.toArray(children).filter(
    (
      child
    ): child is React.ReactElement<React.ComponentProps<typeof Tab.trigger>> =>
      React.isValidElement(child) && child.type === Tab.trigger
  );

  const contents = React.Children.toArray(children).filter(
    (
      child
    ): child is React.ReactElement<React.ComponentProps<typeof Tab.content>> =>
      React.isValidElement(child) && child.type === Tab.content
  );

  return (
    <TabContext.Provider value={{ activeValue: value }}>
      <Tabs.Root
        dir="rtl"
        orientation="vertical"
        className="flex flex-col w-full shadow-sm mt-20"
        value={value}
        onValueChange={onValueChange}
      >
        <Tabs.List aria-label="tabs example" className="shrink-0 flex gap-2">
          {triggers}
        </Tabs.List>
        {contents}
      </Tabs.Root>
    </TabContext.Provider>
  );
}

function TabTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("TabTrigger باید داخل Tab استفاده شود");
  }
  const { activeValue } = context;

  return (
    <Tabs.Trigger
      value={value}
      className="relative px-3 py-1.5 text-sm font-medium text-white -sky-600 focus-visible:outline flex flex-1 items-center justify-center rounded-full hover:opacity-50"
    >
      {activeValue === value && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 rounded-full bg-blue-100"
          transition={{ type: "spring", duration: 0.6 }}
        />
      )}

      <span className="relative z-10 mix-blend-exclusion">{children}</span>
    </Tabs.Trigger>
  );
}

function TabContent({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return (
    <Tabs.Content value={value} className="mt-6">
      {children}
    </Tabs.Content>
  );
}

Tab.trigger = TabTrigger;
Tab.content = TabContent;
