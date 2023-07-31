import {AdvantageProps} from "./Advantage.props";
import styles from './Advantage.module.css'
import Succes from './Succef.svg';
export const Advantage = ({advantages}: AdvantageProps): JSX.Element => {
    return (
      <>
          {advantages.map(advantage => (<div key={advantage._id} className={styles.Advantage}>
                <Succes />
                <div className={styles.AdvantageTitle}>{advantage.title}</div>
                <hr className={styles.vline}/>
                <div className={styles.AdvantageDescription}>{advantage.description}</div>
          </div>))}
      </>
    );
};