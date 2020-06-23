import sys
import firebase_admin
from firebase_admin import credentials 
from firebase_admin import firestore 

CERT_PATH= None #must be replaced with a valid ceritificate path. See <Link>
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


if __name__ == "__main__":
    GET = 'get_doc_by_collection_and_id'
    BATCH_WRITE = 'batch_write_from_csv'
    UPDATE = "update_document_by_id"
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
    else:
        raise Exception("invalid flag used. The only options this script has are {}".format(valid_flags))


"""
Example usage:
$ python yd_utils.py get_doc_by_collection_and_id 2Z56yhUcz1dro04xefh4
> {u'unmarked': u'okun', u'example_eng': u'I am at the seaside', u'example_yor': u'mo w\xe0 n\xed et\xed \xf2kun', u'pos': u'noun', u'marked': u'\xf2kun.', u'meaning_eng': u'sea', u'meaning': u'sea'}

TODO
$ python yd_utils.py batch_write_from_csv path/to/the/csv/file
> DONE. 
"""
