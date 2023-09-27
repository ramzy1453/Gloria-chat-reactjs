import RegsiterSwitcher from "../components/RegsiterSwitcher";
import Image from "../components/Image";
import FormInput from "../components/Home/FormInput";
import { useAuth, useTimeline } from "../hooks";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../store/api";
import { Toaster, toast } from "react-hot-toast";
import c from "classnames";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password at least 8 characters"),
});

export default function Login() {
  const controls = useTimeline([
    { y: -5, x: 200 },
    { x: -200, y: 5 },
    { x: 0, y: 0 },
  ]);
  const { setAuth } = useAuth();

  const [login, { isLoading }] = api.useLoginMutation();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    async validate(values) {
      try {
        await validationSchema.validate(values, {
          abortEarly: false,
        });
        formik.setErrors({});
      } catch (errors) {
        const validationErrors = {};
        errors.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
          toast.error(error.message, {
            duration: 700,
            style: {
              textAlign: "center",
            },
          });
        });
        formik.setErrors(validationErrors);
      }
    },
    async onSubmit({ username, password }) {
      toast.promise(
        login({
          username,
          password,
        }),
        {
          loading: "Logging in...",
          success: ({ data, error }) => {
            if (error) {
              throw new Error(error.data.message);
            }
            setAuth(data);
            return "Logged in successfully!";
          },
          error: ({ message }) => message,
        },
        { duration: 700 }
      );
    },
  });

  return (
    <div className="flex flex-col justify-center h-screen bg-gradient overflow-hidden">
      <RegsiterSwitcher />
      <Toaster />
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <Image
            src="gloria.webp"
            className="w-48 h-48 gloria-logo"
            animate={controls}
            whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
            drag
            dragTransition={{ type: "spring", damping: 10, stiffness: 100 }}
          />
          <h1 className="text-4xl">Gloria</h1>
        </div>
        <motion.form
          className="flex flex-col space-y-6 min-w-[30%] max-w-xl mx-auto"
          initial={{ opacity: 0.6, scale: 0.6, y: 70 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4 },
          }}
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col space-y-3">
            <FormInput
              type="text"
              id="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <button
            className={c("btn btn-info hover:scale-105 transition-all", {
              "btn-disabled": isLoading,
            })}
            type="submit"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner" />
                loading
              </>
            ) : (
              "Join"
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
