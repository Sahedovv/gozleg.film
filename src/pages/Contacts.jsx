import { useForm } from 'react-hook-form';
import styles from './Contacts.module.css';

const Contacts = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://formspree.io/f/mkgbbypk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert('Ugradyldy!');
                reset();
            } else {
                alert('Ugradylmady');
            }
        } catch (error) {
            alert('Oşibka: ' + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Biz bilen habarlaşyň</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="adyňyz"
                    {...register('name', { required: true })}
                />
                <input
                    className={styles.input}
                    type="email"
                    placeholder="e-mail poçta"
                    {...register('email', { required: true })}
                />
                <textarea
                    className={styles.textarea}
                    placeholder="teklipleriňiz"
                    {...register('message', { required: true })}
                ></textarea>
                <button className={styles.button} type="submit">
                    Ugrat
                </button>
            </form>
        </div>
    );
};

export default Contacts;