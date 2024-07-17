import { useEffect, useState } from "react";
import logo from "/logo.png";
import auth from "/auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { imageUpload } from "../../api/utils";
import DynamicTitle from "../../Components/DynamicTitle";

const Registration = () => {
  const axiosCommon = useAxiosCommon();
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    } else if (errors.pin) {
      toast.error(errors.pin.message);
    } else if (errors.phone) {
      toast.error(errors.phone.message);
    } else if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.role) {
      toast.error(errors.role.message);
    } else if (errors.termsConditions) {
      toast.error(errors.termsConditions.message);
    }
  }, [
    errors.name,
    errors.pin,
    errors.phone,
    errors.email,
    errors.photo,
    errors.role,
    errors.termsConditions,
  ]);

  const onSubmit = async (data) => {
    const { name,pin,phone, email, photo, role } = data;

    try {
      // 1. upload image and get image url
      setLoading(true);

      const imageURL = await imageUpload(photo[0]);
      console.log(imageURL);


      const userInfo = {
        name,
        pin,
        phone,
        email,
        imageURL,
        role,
      };
      
      const { data } = await axiosCommon.post("/users", userInfo);

      console.log(data);

      if (data?.insertedId) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <DynamicTitle pageTitle="Registration" />
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 ">
            Create an account
          </p>

          <div className="flex items-center justify-between mt-4"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                autoComplete="name"
                name="name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "You must fill Name input field",
                  },
                })}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="pin"
              >
                PIN
              </label>
              <input
                id="pin"
                autoComplete="pin"
                name="pin"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                {...register("pin", {
                  required: {
                    value: true,
                    message: "You must fill PIN input field",
                  },
                  pattern: /^[0-9]{5}$/,
                  message: "Please enter a valid 5-digit PIN number.",
                })}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="phone"
              >
                Mobile Number
              </label>
              <input
                id="phone"
                autoComplete="phone"
                name="phone"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "You must fill Mobile Number input field",
                  },
                  pattern: {
                    value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                    message: "Please enter a valid Bangladeshi mobile number.",
                  },
                })}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="photo"
              >
                Photo
              </label>
              <input
                id="photo"
                autoComplete="photo"
                name="photo"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="file"
                {...register("photo", {
                  required: {
                    value: true,
                    message: "You must fill Photo URL input field",
                  },
                })}
              />
            </div>

            <div className="mt-4">
              <select
                name="role"
                id="role"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Select Role"
                {...register("role", {
                  required: {
                    value:true,
                    message:"Please select you role."
                  }
                })}
              >
                <option value="">Select Role</option>
                <option value="student">User</option>
                <option value="tutor">Agent</option>
              </select>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "You must fill Email input field",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:"Please enter a valid email address."
                  },
                })}
              />
            </div>

            <div className="flex mt-4 items-center flex-row gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                {...register("termsConditions", {
                  required: {
                    value: true,
                    message: "You need to agree with terms and conditions",
                  },
                })}
              />
              <label className="label">
                <span className="label-text">
                  I agree with{" "}
                  <Link className="underline text-[#0073e1]">
                    terms & conditions
                  </Link>
                </span>
              </label>
            </div>

            <div className="mt-6">
              <button
                disabled={loading}
                type="submit"
                className="w-full px-6 py-3 text-sm disabled:cursor-not-allowed font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4D95EA] rounded-lg hover:bg-[#2f86eb] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Registration"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/login"
              className="text-lg text-blue-700 underline  hover:underline"
            >
              or Login
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${auth})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Registration;
