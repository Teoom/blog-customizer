import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import {
	fontColors,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontFamilyOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsProps = {
	parameters: ArticleStateType;
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	parameters,
	onChange,
}: ArticleParamsProps) => {
	const element = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(parameters);

	const resetForm = () => {
		setArticleState(parameters);
	};

	const handleToggleForm = () => {
		setIsOpen(!isOpen);
		isOpen && resetForm();
	};

	useOutsideClickClose({
		isOpen: isOpen,
		onChange: handleToggleForm,
		rootRef: element,
	});

	const handleParameters = (selected: OptionType, type: string) => {
		setArticleState({ ...articleState, [type]: selected });
	};

	const handleFormSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		onChange(articleState);
	};

	return (
		<div ref={element}>
			<ArrowButton isOpen={isOpen} onClick={handleToggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as={'h2'} uppercase weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleParameters}
						type='fontFamilyOption'
					/>
					<RadioGroup
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						name='fontSizeOption'
						onChange={handleParameters}
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleParameters}
						type='fontColor'
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleParameters}
						type='backgroundColor'
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleParameters}
						type='contentWidth'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								onChange(defaultArticleState);
								setArticleState(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleFormSubmit as () => void}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
