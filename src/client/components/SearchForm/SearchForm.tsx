import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReloadIcon } from '../../icons/ReloadIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import styles from './SearchForm.module.css';

type SearchFormProps = {
	action: string;
};

export const SearchForm = ({ action }: SearchFormProps) => {
	const intl = useIntl();

	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const keyword = formData.get('keyword')?.toString().trim() || '';

		if (keyword.length > 0) {
			navigate(`${action}?keyword=${encodeURIComponent(keyword)}`);
		}
	};

	const handleReset = () => {
		navigate(action, { replace: true });
	};

	return (
		<form
			method="get"
			autoComplete="off"
			name="search-form"
			onSubmit={handleSubmit}
			className={styles['search-form']}
		>
			<input
				type="text"
				name="keyword"
				autoComplete="off"
				maxLength={30}
				defaultValue={searchParams.get('keyword') || undefined}
				placeholder={intl.formatMessage({ id: 'keyword' })}
			/>
			<button type="submit">
				<SearchIcon />
			</button>
			<button type="reset" onClick={() => handleReset()}>
				<ReloadIcon />
			</button>
		</form>
	);
};
