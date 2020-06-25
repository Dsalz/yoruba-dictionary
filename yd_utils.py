import sys
import random
import firebase_admin
from firebase_admin import credentials 
from firebase_admin import firestore 

CERT_PATH= None #must be replaced with a valid certificate path. See <Link>
cred = credentials.Certificate(CERT_PATH)
firebase_admin.initialize_app(cred)
db = firestore.client()

def load_csv_into_json(filepath):
    #reads a CSV file, loads it into a json object and returns it
    pass

def sanity_check_json(word_collection):
    #does sanity checks that all the needed fields are in the json object
    pass

def get_word_by_id(word_id, collection_name="words"):
    doc_ref = db.collection(collection_name)
    return doc_ref.document(word_id).get().to_dict()

def batch_write_from_csv(filepath, collection):
    new_words = load_csv_into_json(filepath)
    sanity_check_json(new_words)

def set_random_fields():
    # this function scans through the database and sets a random field for any
    # word record that does not have one
    words_ref = db.collection("words")
    query_results = words_ref.get()
    for word in query_results:
        word_dict = word.to_dict().copy()
        if 'random' not in word_dict.keys():
            print("adding random field to unmarked: {}".format(word_dict['unmarked']))
            print("with the meaning {}".format(word_dict['meaning_eng']))
            doc = words_ref.document(word.id)
            word_dict.update({'random': random.random()})
            doc.update(word_dict)

def get_random_word():
    random_number = random.random()
    words_ref = db.collection("words")
    first_after_random = words_ref.order_by("random").start_at({"random": random_number}).limit(1)
    return {doc.id: doc.to_dict() for doc in first_after_random.get() }

if __name__ == "__main__":
    GET = 'get_word_by_id'
    BATCH_WRITE = 'batch_write_from_csv'
    UPDATE = "update_document_by_id"
    GET_RANDOM = "get_random_word"
    SET_RANDOM_FIELDS = "set_random_fields"
    valid_flags = [GET, BATCH_WRITE, UPDATE]
    if sys.argv[1] == GET:
        assert(len(sys.argv) in (3, 4))
        print(get_word_by_id(sys.argv[2]))
    elif sys.argv[1] == BATCH_WRITE:
        assert(len(sys.argv) == 3)
        print("Feature not yet implemented")
    elif sys.argv[1] == UPDATE:
        assert (len(sys.argv) == 3)
        print("Feature not yet implemented")
    elif sys.argv[1] == GET_RANDOM:
        print(get_random_word())
    elif sys.argv[1] == SET_RANDOM_FIELDS:
        set_random_fields()
        print("DONE.")
    else:
        raise Exception("invalid flag used. The only options this script has are {}".format(valid_flags))


"""
Example usage:
$ python yd_utils.py get_doc_by_id 2Z56yhUcz1dro04xefh4
> {u'unmarked': u'okun', u'example_eng': u'I am at the seaside', u'example_yor': u'mo w\xe0 n\xed et\xed \xf2kun', u'pos': u'noun', u'marked': u'\xf2kun.', u'meaning_eng': u'sea', u'meaning': u'sea'}

$ python yd_utils.py set_random_fields
> adding random field to unmarked: ijamba
  with the meaning an unexpected tragic event
  DONE.

TODO
$ python yd_utils.py batch_write_from_csv path/to/the/csv/file
> DONE.
"""
