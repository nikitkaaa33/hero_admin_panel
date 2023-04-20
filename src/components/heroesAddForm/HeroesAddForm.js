import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [element, setElement] = useState("");
	const id = uuidv4();

	const [createHero] = useCreateHeroMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newHero = { id, name, description, element };

		createHero(newHero).unwrap();

		setName("");
		setDescription("");
		setElement("");
	};

	return (
		<Formik
			initialValues={{
				name: "",
				description: "",
				element: "",
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(2, "Минимум 2 символа для заполнения")
					.required("Обязательное поле!"),
				description: Yup.string()
					.min(2, "Минимум 2 символа для заполнения")
					.required("Обязательное поле!"),
			})}
			onSubmit={(e) => handleSubmit(e)}
		>
			<Form className="border p-4 shadow-lg rounded">
				<div className="mb-3">
					<label htmlFor="name" className="form-label fs-4">
						Name of the new hero
					</label>
					<Field
						required
						type="text"
						name="name"
						className="form-control"
						id="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						placeholder="What is my name?"
					/>
					<ErrorMessage
						style={{ color: "red" }}
						className="error"
						name="name"
						component="div"
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="text" className="form-label fs-4">
						Description
					</label>
					<Field
						required
						name="text"
						className="form-control"
						id="text"
						value={description}
						as="textarea"
						onChange={(event) => setDescription(event.target.value)}
						placeholder="What can I do?"
						style={{ height: "130px" }}
					/>
					<ErrorMessage className="error" name="text" component="div" />
				</div>

				<div className="mb-3">
					<label htmlFor="element" className="form-label">
						Choose the element of the hero
					</label>
					<Field
						required
						className="form-select"
						id="element"
						value={element}
						as="select"
						onChange={(event) => setElement(event.target.value)}
						name="element"
					>
						<option>I own the element...</option>
						<option value="fire">Fire</option>
						<option value="water">Water</option>
						<option value="wind">Wind</option>
						<option value="earth">Earth</option>
					</Field>
					<ErrorMessage className="error" name="element" component="div" />
				</div>

				<button
					onClick={(e) => handleSubmit(e)}
					type="submit"
					className="btn btn-primary"
				>
					Создать
				</button>
			</Form>
		</Formik>
	);
};

export default HeroesAddForm;
