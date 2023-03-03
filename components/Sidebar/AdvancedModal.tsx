import { Form, Formik } from "formik";
import Modal from "../Modal";
import * as Yup from "yup";
import Select from "../Select";
import Input from "../Input";
import InputWrapper from "../InputWrapper";
import Button from "../Button";
import { omitBy } from "lodash";
import { usePosts } from "@/hooks/usePosts";

const excludeCheck = (value: string) => {
  if (!value) return true;
  // if value contains spaces check that the phrase is wrapped in quotes with a regex

  if (value.includes(" ")) {
    const regex = /"(.*)"/;
    const match = value.match(regex);
    if (!match) return false;

    const phrase = match[1];
    if (phrase.includes('"')) return false;
  }
  return true;
};

const validationSchema = Yup.object().shape({
  search: Yup.string(),
  sort: Yup.string()
    .oneOf(["relevance", "hot", "top", "new", "comments"])
    .required("Required"),
  "title:every": Yup.string().test(
    "is-valid",
    "Invalid search term",
    (value) => {
      return excludeCheck(value as string);
    }
  ),
  "selftext:every": Yup.string().test(
    "is-valid",
    "Invalid search term",
    (value) => {
      return excludeCheck(value as string);
    }
  ),
  "title:some": Yup.string().test(
    "is-valid",
    "Invalid search term",
    (value) => {
      return excludeCheck(value as string);
    }
  ),
  "selftext:some": Yup.string().test(
    "is-valid",
    "Invalid search term",
    (value) => {
      return excludeCheck(value as string);
    }
  ),
  exclude: Yup.string().test("is-valid", "Invalid search term", (value) => {
    return excludeCheck(value as string);
  }),
  "title:not": Yup.string().test("is-valid", "Invalid search term", (value) => {
    return excludeCheck(value as string);
  }),
  "selftext:not": Yup.string().test(
    "is-valid",
    "Invalid search term",
    (value) => {
      return excludeCheck(value as string);
    }
  ),
  subreddit: Yup.string().test("is-valid", "Invalid search term", (value) => {
    if (!value) return true;
    if (value.includes(" ")) return false;
    return true;
  }),
  author: Yup.string().test("is-valid", "Invalid search term", (value) => {
    if (!value) return true;
    if (value.includes(" ")) return false;
    return true;
  }),
  flair: Yup.string(),
  time: Yup.string()
    .oneOf(["all", "day", "hour", "month", "week", "year"])
    .required("Required"),
});

interface AdvancedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdvancedModal = ({ open, onOpenChange }: AdvancedModalProps) => {
  const { queries, setQueries } = usePosts();

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content className="max-w-[441px] w-full p-2">
          <Modal.Title className="font-base text-lg">
            Advanced Search
          </Modal.Title>

          <Formik
            initialValues={{ ...queries }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const omittedEmpty = omitBy(values, (value) => !value);

              setQueries(omittedEmpty as typeof queries);
              onOpenChange(false);
            }}
          >
            {({ handleChange, handleBlur, setFieldValue, values, errors }) => {
              return (
                <Form className="grid gap-2 mt-2">
                  <InputWrapper label="Search term" error={errors["search"]}>
                    <Input
                      onChange={handleChange}
                      name="search"
                      placeholder="Term or phrase"
                      value={values["search"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper label="Sort by">
                    <Select
                      data={[
                        {
                          label: "Relevance",
                          value: "relevance",
                        },
                        {
                          label: "Hot",
                          value: "hot",
                        },
                        {
                          label: "Top",
                          value: "top",
                        },
                        {
                          label: "New",
                          value: "new",
                        },
                        {
                          label: "Comments",
                          value: "comments",
                        },
                      ]}
                      onChange={(value) => setFieldValue("sort", value)}
                      placeholder="Sort by"
                      value={values.sort}
                    />
                  </InputWrapper>
                  <InputWrapper label="Time">
                    <Select
                      data={[
                        {
                          label: "All",
                          value: "all",
                        },
                        {
                          label: "Last Year",
                          value: "year",
                        },
                        {
                          label: "Last Month",
                          value: "month",
                        },
                        {
                          label: "Last Week",
                          value: "week",
                        },
                        {
                          label: "Last 24 Hours",
                          value: "day",
                        },
                        {
                          label: "Last Hour",
                          value: "hour",
                        },
                      ]}
                      onChange={(value) => setFieldValue("time", value)}
                      placeholder="Time"
                      value={values.time}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Match in title"
                    tooltip="Match search term(s) in title. Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors["title:every"]}
                  >
                    <Input
                      onChange={handleChange}
                      name="title:every"
                      placeholder="Term or phrase"
                      value={values["title:every"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Match in content"
                    tooltip="Match search term(s) in content. Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors["selftext:every"]}
                  >
                    <Input
                      onChange={handleChange}
                      name="selftext:every"
                      placeholder="Term or phrase"
                      value={values["selftext:every"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Include in title"
                    tooltip="Include one or more search term(s) in title. Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors["title:some"]}
                  >
                    <Input
                      onChange={handleChange}
                      name="title:some"
                      placeholder="Term or phrase"
                      value={values["title:some"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Include in content"
                    tooltip="Include one or more search term(s) in content. Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors["selftext:some"]}
                  >
                    <Input
                      onChange={handleChange}
                      name="selftext:some"
                      placeholder="Term or phrase"
                      value={values["selftext:some"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Exclude"
                    tooltip="Exclude search term(s). Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors.exclude}
                  >
                    <Input
                      onChange={handleChange}
                      name="exclude"
                      placeholder="Term or phrase"
                      value={values.exclude}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Exclude from title"
                    tooltip="Exclude search term(s) from title. Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors["title:not"]}
                  >
                    <Input
                      onChange={handleChange}
                      name="title:not"
                      placeholder="Term or phrase"
                      value={values["title:not"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Exclude from content"
                    tooltip="Exclude search term(s) from content. Can be a string or a quoted string for phrases. Can be multiple terms separated by commas."
                    error={errors["selftext:not"]}
                  >
                    <Input
                      onChange={handleChange}
                      name="selftext:not"
                      placeholder="Term or phrase"
                      value={values["selftext:not"]}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Subreddit(s)"
                    error={errors["subreddit"]}
                    tooltip={
                      "Restrict to specific subreddit(s). Can be a string or comma-delimited string"
                    }
                  >
                    <Input
                      onChange={handleChange}
                      name="subreddit"
                      placeholder="Subreddit(s)"
                      value={values.subreddit}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Author"
                    error={errors["author"]}
                    tooltip="Restrict to specific author(s). Can be a string or comma-delimited string"
                  >
                    <Input
                      onChange={handleChange}
                      name="author"
                      placeholder="Author"
                      value={values.author}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <InputWrapper label="Flair" error={errors["flair"]}>
                    <Input
                      onChange={handleChange}
                      name="flair"
                      placeholder="Flair"
                      value={values.flair}
                      onBlur={handleBlur}
                    />
                  </InputWrapper>
                  <div className="flex gap-2">
                    <Modal.Close className="w-full" type="button">
                      <Button
                        className="w-full"
                        type="button"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </Modal.Close>

                    <Button type="submit" className="w-full">
                      Search
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default AdvancedModal;
