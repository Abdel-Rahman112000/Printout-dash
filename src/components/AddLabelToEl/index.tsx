import { Stack, Typography, TypographyProps } from "@mui/material";

function AddLabelToEl(props: PropsType) {
  return (
    <Stack
      width={1}
      {...(props.row
        ? {
            direction: "row",
            spacing: 2,
            alignItems: "center",
          }
        : undefined)}
    >
      <Typography
        component="label"
        gutterBottom={!props.row}
        {...props.labelTypographyProps}
      >
        {props.label}
      </Typography>
      {props.children}

      {props.error && (
        <Typography variant="body2" color="error">
          {props.error}
        </Typography>
      )}
    </Stack>
  );
}

export default AddLabelToEl;

type PropsType = {
  children?: React.ReactNode;
  label: string;
  required?: boolean;
  labelTypographyProps?: TypographyProps;
  row?: boolean;
  error?: React.ReactNode;
};

export type AddLabelToElProps = PropsType;
