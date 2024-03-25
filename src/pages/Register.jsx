import React from 'react';
import { useFormik } from "formik";
import { Button, Container, Row, Col, Label, Input } from 'reactstrap';
import googleLogo from '../assets/google.png';
import Header from '../components/Header';
import * as Yup from "yup";
// Import your CSS file for additional styling
import { showErrorMessage, showSuccessMessage } from "../components/toast";
import  ErrorMessage  from "../components/ErrorMessage"
import { Network, Urls } from "../apiConfiguration";
// import { useLoader } from "../hooks";
import { useNavigate } from "react-router-dom";

const initialValues = {
	email: '',
	password: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Register = () => {
	// const { setLoading } = useLoader();
	const navigate = useNavigate();

	const handleRegister = async (values) => {
    console.log(values)
		// setLoading(true)
		const response = await Network.post(Urls.userRegister, values);
		// setLoading(false)
		console.log("Done")

		if (!response.ok) return showErrorMessage(response.data.error);
		else {
			navigate("/")
			return showSuccessMessage(response.data.message)
		}
  };

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
	useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleRegister,
	});


  return (
	<>
		<Header/>
		<Container className="mt-5 h-screen">
			<Row className="flex justify-center">
				<div className='mb-2'></div>
				<Col xs={12} sm={6} md={6} lg={4}>
					<Container className='flex items-center justify-center m-2'>
						<Button className="flex p-2 rounded" style={{backgroundColor: "white", color: "grey", border: "1px solid grey"}}>
							<img
							src={googleLogo}
							alt="Google Logo"
							className='h-7'
							/>

							CONTINUE WITH GOOGLE
						</Button>
					</Container>
					<div className='mb-4'></div>
					<Row>
						<Col className='mb-4'>
							<hr/>
						</Col>
						<Col md={2} className='flex justify-center mb-4'>
							<p>OR</p>
						</Col>
						<Col>
							<hr/>
						</Col>
					</Row>

					<div className="mb-12"></div>
					<Label className="form-label" htmlFor="register-email">Email address or username</Label>
					<Input
						type="email"
						id="register-email"
						name="email"
						placeholder="Email address or username"
						onBlur={handleBlur}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md mb-1"
					/>
					<ErrorMessage name="email" errors={errors} touched={touched} />
					<div className='mb-3'></div>
					<Label className="form-label" htmlFor="register-password">Password</Label>
					<Input
						type="password"
						id="register-password"
						name="password"
						placeholder="Password"
						onBlur={handleBlur}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md mb-1"
					/>
					<ErrorMessage name="password" errors={errors} touched={touched} />
					<div className='mb-3'></div>
					<div>
						<Button
							block
							className="w-full bg-teal-500 text-white px-3 py-2 rounded-md mb-3"
							onClick={handleSubmit}
						>
						SIGN UP
					</Button>
					</div>
					<div className='mb-8'></div>
					<hr />


					<div className='mb-8'></div>
					<p className="text-center mb-3">Already have an account ?</p>
					<Container className='flex items-center justify-center'>
						<Button 
							variant="outline-secondary" 
							block
							style={{backgroundColor: "white", color: "grey", border: "1px solid grey", padding: "10px 20px"}}
							onClick={()=> navigate("/login")}
						>

							LOGIN
						</Button>
					</Container>
				</Col>
			</Row>
		</Container>
	</>
  );
};

export default Register;
