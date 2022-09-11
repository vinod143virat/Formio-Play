import React, { ReactElement, FC, useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Switch, Divider } from "@mui/material";
import ReactDOM from "react-dom";
import { makeStyles } from "@mui/styles";
import { Form, FormBuilder } from "react-formio";
import ReactJson from "react-json-view";

// import "../Styles.css";

const useStyles = makeStyles({
  builderActionButtons: {
    float: "right",
    backgroundColor: "#4D6CD9",
    margin: "15px"
  }
});

export interface ValidationProps {
  customMessage?: string;
  pattern?: RegExp;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface DataValue {
  label: string;
  value: string;
}

interface DataWithShortcut extends DataValue {
  label: string;
  value: string;
  shortcut?: string;
}

export interface FormioComponent {
  defaultValue?: string | boolean | unknown[];
  description?: string;
  disableOnInvalid?: boolean;
  disabled?: boolean;
  input?: boolean;
  key?: string;
  label?: string;
  multiple?: boolean;
  placeholder?: string;
  type?:
    | "textfield"
    | "checkbox"
    | "selectboxes"
    | "number"
    | "email"
    | "phoneNumber"
    | "datetime"
    | "textarea"
    | "button"
    | "select"
    | "radio"
    | "panel"
    | "url"
    | "currency"
    | "password"
    | "file";
  validate?: ValidationProps;
  validateOn?: "change" | "blur";

  data?: {
    values: DataValue[];
  };
  widget?: unknown;
  inputMask?: string;
  action?: "next" | "save" | "callback" | "triggerProcess";
  enableTime?: boolean;
  variableValue?: unknown;
  values?: DataWithShortcut[];
  components?: FormioComponent[];
  mask?: boolean;
  currency?: string;
  spellcheck?: boolean;
  storage?: string;
  webcam?: boolean;
  fileTypes?: DataValue[];
}

export interface FormioSchema {
  display?: string;
  components?: FormioComponent | [];
}

const FormCreator: FC<any> = (props: any): ReactElement => {
  const [currentFormJSON, setCurrentFormJSON] = useState<any>({});
  const [submissionData, setSubmissionData] = useState<any>({});

  const classes = useStyles();

  const onFormSchemaChange = (schema) => {
    if (schema.components) {
      setCurrentFormJSON({ display: "form", components: schema.components });
      console.log(schema.components);
    }
  };

  console.log("State", currentFormJSON);

  const handleSubmit = (submission) => {
    setSubmissionData(submission.data);
    console.log("Submission", submission);
  };

  // const myOptions = {
  //   builder: {
  //     data: false,
  //     advanced: false,
  //     layout: false,
  //     premium: false,
  //   },
  //   noDefaultSubmitButton: true,
  // };

  return (
    <Grid container spacing={1} marginTop={2}>
      <Grid xs={12} md={13}>
        <Typography variant="h4" component="h1" ml={2} gutterBottom textAlign={"center"}>
          TSF Form Playground
        </Typography>
        <Divider />
        <br></br>
        <br></br>
      </Grid>
      <Grid xs={12} md={13} sx={{ marginBottom: "30px", display: "flex" }}>
        <Box sx={{ marginLeft: "15px", width: "800px" }}>
          <Typography mb={3} variant="h4">
            Form Preview
          </Typography>
          <Form
            form={currentFormJSON}
            // onChange={(schema) => console.log("FormSchema", schema)}
            onSubmit={(submission) => {
              handleSubmit(submission);
            }}
          />
        </Box>
        <Box sx={{ margin: "15px", width: "450px", overflow: "auto" }}>
          <Typography mb={3} variant="h4">
            Submission JSON
          </Typography>
          <ReactJson src={submissionData} theme="monokai" />
        </Box>
      </Grid>

      <Grid
        xs={12}
        md={13}
        sx={{ fontSize: "16px", height: "500px", marginTop: "30px" }}
        display="flex"
      >
        <Box sx={{ marginLeft: "13px", width: "850px" }}>
          <Typography mb={3} variant="h4">
            Form Builder
          </Typography>

          <FormBuilder
            // options={myOptions}
            form={currentFormJSON}
            onChange={(schema) => {
              onFormSchemaChange(schema);
              console.log("FormBuilderSchema", schema);
            }}
          />
        </Box>
        <Box sx={{ overflow: "auto", margin: "15px" }}>
          <Typography mb={3} variant="h4">
            Form JSON
          </Typography>
          <ReactJson src={currentFormJSON} theme="monokai" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FormCreator;
