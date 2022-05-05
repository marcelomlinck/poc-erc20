import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Link, Layout } from "components";
import { userService } from 'services';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default Register;

function Register() {
  const router = useRouter();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        // alertService.success('Registration successful', { keepAfterRouteChange: true });
        toast.success("Registration successful!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        router.push("login");
      })
      .catch(() => {
        toast.error("Registration failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      });
  }

  return (
    // <Layout>
    //     <div className="card">
    //         <h4 className="card-header">Register</h4>
    //         <div className="card-body">
    //             <form onSubmit={handleSubmit(onSubmit)}>
    //                 <div className="form-group">
    //                     <label>First Name</label>
    //                     <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
    //                     <div className="invalid-feedback">{errors.firstName?.message}</div>
    //                 </div>
    //                 <div className="form-group">
    //                     <label>Last Name</label>
    //                     <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
    //                     <div className="invalid-feedback">{errors.lastName?.message}</div>
    //                 </div>
    //                 <div className="form-group">
    //                     <label>Username</label>
    //                     <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
    //                     <div className="invalid-feedback">{errors.username?.message}</div>
    //                 </div>
    //                 <div className="form-group">
    //                     <label>Password</label>
    //                     <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
    //                     <div className="invalid-feedback">{errors.password?.message}</div>
    //                 </div>
    //                 <button disabled={formState.isSubmitting} className="btn btn-primary">
    //                     {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
    //                     Register
    //                 </button>
    //                 <Link href="/account/login" className="btn btn-link">Cancel</Link>
    //             </form>
    //         </div>
    //     </div>
    // </Layout>

    <Layout>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  {...register('firstName')}
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                  required
                />
                <div className="invalid-feedback">{errors.firstName?.message}</div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  {...register('lastName')}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                  required
                />
                <div className="invalid-feedback">{errors.lastName?.message}</div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  {...register('username')}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                  required
                />
                <div className="invalid-feedback">{errors.username?.message}</div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register('password')}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                  required
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slingblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
    <Link href="/account/login" className=" min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 btn btn-link font-medium text-slingblue hover:text-indigo-600">Cancel and return to login</Link>
    </Layout>
  );
}
