"use client";

import { usePosts } from "@/hooks/usePosts";
import { cn } from "@/utils/cn";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Button from "../Button";
import Command from "../Command";
import Input from "../Input";
import AdvancedModal from "./AdvancedModal";

const SearchForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { setQueries, queries } = usePosts();
  useHotkeys("ctrl+k", () => setOpen(true), [open], {
    enableOnFormTags: true,
  });

  useHotkeys(
    "ctrl+/",
    () => {
      const input = document.querySelector(
        "input[name='search']"
      ) as HTMLInputElement;
      input.focus();
    },
    []
  );

  return (
    <>
      <AdvancedModal open={open} onOpenChange={setOpen} />
      <Formik
        initialValues={{ search: queries.search }}
        onSubmit={(values) => {
          setQueries((prev) => ({
            ...prev,
            search: values.search,
          }));
        }}
        key={queries.search}
      >
        {({ handleChange, values }) => (
          <Form className="mt-3">
            <Input
              suffix={<Command cmd="⌘ + /" />}
              placeholder={"Search..."}
              name="search"
              value={values.search}
              onChange={handleChange}
            />
            <div className={cn("flex", "items-center", "gap-2", "mt-2")}>
              <Button className="flex-1" type="submit">
                Search
              </Button>
              <Button
                variant="secondary"
                type="button"
                suffix={<Command cmd="⌘ + k" />}
                onClick={() => setOpen(true)}
              >
                Advanced
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
