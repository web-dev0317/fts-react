import AddItemForm from '../../components/commons/redux-form/Form';
import Count from '../../components/add/Count';
import { useState } from 'react';
import Restrict from '../../components/modal/restrict';

export default function AddItem() {
  const [restrict, setRestrict] = useState(true);
  return (
    <>
      <Restrict restrict={restrict} setRestrict={setRestrict} />
      <AddItemForm />
      <Count />
    </>
  );
}
