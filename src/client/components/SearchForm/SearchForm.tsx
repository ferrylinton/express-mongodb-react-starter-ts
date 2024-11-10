import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "../../icons/ReloadIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";

type SearchFormProps = {
	action: string
}

export const SearchForm = ({ action }: SearchFormProps) => {

	const intl = useIntl();

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const keyword = formData.get("keyword")?.toString().trim() || "";

		if (keyword.length > 0) {
			navigate(`${action}?keyword=${encodeURIComponent(keyword)}`);
		}
	};

	const handleReset = () => {
		navigate(action, {replace: true})
	}

	return (

		<div className={styles['search-form']}>
			<form method="get" autoComplete="off" name="search-form" onSubmit={handleSubmit}>
				<input type="text" name='keyword' autoComplete='off' maxLength={40} placeholder={intl.formatMessage({ id: "keyword" })} />
				<button type="submit">
					<SearchIcon />
				</button>
				<button type="reset" onClick={() => handleReset()}>
					<ReloadIcon />
				</button>
			</form>
		</div>

	)
}
