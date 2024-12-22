import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(() => data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	//setActiveIndex(0);

	const onBackButtonClick = () => {
		setActiveIndex((activeIndex) => {
			return activeIndex - 1;
		});
	};
	const onNextButtonClick = () => {
		setActiveIndex((activeIndex) => {
			if (activeIndex >= 6) {
				return 0;
			}
			return activeIndex + 1;
		});
	};

	const onStepsClickOn = (event) => {
		setActiveIndex(() => {
			return event.target.id;
		});
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[Number(activeIndex)].content}
					</div>
					<>
						<ul className={styles['steps-list']}>
							{
								/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */
								steps.map((item, index) => (
									<li
										className={`${styles['steps-item']} ${Number(activeIndex) === index ? styles.active : ''} ${index < Number(activeIndex) ? styles.done : ''}`}
										id={index}
									>
										{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
										<button
											className={styles['steps-item-button']}
											id={index}
											onClick={onStepsClickOn}
										>
											{item.id.substring(2)}
										</button>
										{/* При клике на кнопку установка выбранного шага в качестве активного */}
										{item.title}
									</li>
								))
							}
						</ul>
					</>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onBackButtonClick}
							disabled={Number(activeIndex) === 0 ? true : false}
						>
							Назад
						</button>
						<button className={styles.button} onClick={onNextButtonClick}>
							{Number(activeIndex) !== 6 ? 'Далее' : 'Начать сначала'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
