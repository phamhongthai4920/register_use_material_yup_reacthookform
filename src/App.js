import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default function App() {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, "Name must be under 30 characters.")
      .required("This must not be empty."),
    email: Yup.string().email().required("This must not be empty."),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
      )
      .required("This must not be empty."),
    confirmPassword: Yup.string()
      .min(8, "Password should be longer than 8 characters.")
      .required("This must not be empty.")
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm passwords must match password above."
      )
  });

  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "ohh"
    }
  };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    // display form data on success
    alert("Tada!\n" + JSON.stringify(data, null, 4));
    return false;
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <Typography variant="h4">React Hook Form 7</Typography>
      <Typography variant="h6" gutterBottom>
        with Yup and Material UI
      </Typography>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            className={classes.textField}
            fullWidth
            autoComplete="off"
            gutterBottom
            defaultValue="hehehe"
            {...register("name", { required: true })}
          />
          <Typography variant="body2" color="error" align="left">
            {errors.name?.message}
          </Typography>

          <TextField
            type="email"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            className={classes.textField}
            fullWidth
            autoComplete="off"
            {...register("email", { required: true })}
          />
          <Typography variant="body2" color="error" align="left">
            {errors.email?.message}
          </Typography>

          <TextField
            type="password"
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            className={classes.textField}
            fullWidth
            autoComplete="off"
            {...register("password")}
          />
          <Typography variant="body2" color="error" align="left">
            {errors.password?.message}
          </Typography>

          <TextField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="confirmPassword"
            variant="outlined"
            className={classes.textField}
            fullWidth
            autoComplete="off"
            {...register("confirmPassword")}
          />
          <Typography variant="body2" color="error" align="left">
            {errors.confirmPassword?.message}
          </Typography>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
          <Button
            onClick={() => reset()}
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Reset
          </Button>
        </form>
      </div>
      <Typography variant="button">
        Create by <Link color="secondary">@Wangchimei</Link>
      </Typography>
    </Container>
  );
}
