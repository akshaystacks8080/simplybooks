import psycopg2
import dbconfig
import traceback
import csv
from datetime import datetime


def check_books_exists(conn):
    cur = conn.cursor()
    status = False
    sql = """
       SELECT COUNT(*)
       FROM information_schema.tables
       WHERE table_name = 'books'
       """
    cur.execute(sql)
    if cur.fetchone()[0] == 1:
        cur.close()
        status = True
    cur.close()
    return status


def get_db_connection():
    """Returns Database connection object"""

    conn = None
    try:
        conn = psycopg2.connect(dbname=dbconfig.DATABASE_NAME,
                                user=dbconfig.DATABASE_USER,
                                password=dbconfig.DATABASE_PASSWORD)
        conn.set_client_encoding('UNICODE')
    except:
        print("Failed to connec to database")
        traceback.print_exc()
    return conn


def get_db_cursor(conn):
    """Returns database curser object """
    cur = None
    try:
        cur = conn.cursor()
    except:
        print("Failed to get connection object")
        traceback.print_exc()
    return cur


def create_books_table(cur):
    """creates books table
        Returns boolean"""
    pass_status = False
    sql = """CREATE TABLE books(bookId int,
            title varchar(1000),
            authors varchar(1000),
            average_rating real,
            isbn varchar(100),
            isbn_13 varchar(100),
            language_code varchar(10),
            num_pages int,
            rating_count int,
            text_reviews_count int,
            publication_date varchar(20),
            publisher varchar(100)
            );"""
    try:
        cur.execute(sql)
        cur.connection.commit()
        pass_status = True
    except:
        print("Failed to create table")
        traceback.print_exc()
        pass_status = False
    return pass_status


def get_books_from_csv(cur):
    """Reads books data from csv file
    Returns boolean"""

    booksreader = None
    bookslist = []
    with open("dataset/books.csv", 'r', encoding='UTF8') as csvfile:
        booksreader = csv.reader(csvfile)
        bookslist = list(booksreader)
    return bookslist[1::]


def add_books(conn, books):
    """Adds book data to table
    Returns boolean"""
    status = True
    cur = conn.cursor()
    for book in books:
        bookId = int(book[0])
        bookName = book[1]
        bookAuthor = book[2]
        bookRating = float(book[3])
        bookIsbn = book[4]
        bookIsbn3 = book[5]
        bookLang = book[6]
        bookPages = int(book[7])
        bookRatingCount = int(book[8])
        bookTextReviewsCount = int(book[9])
        bookDate = book[10]
        bookPublisher = book[11]
        newData = [bookId, bookName, bookAuthor, bookRating, bookIsbn, bookIsbn3, bookLang,
                   bookPages, bookRatingCount, bookTextReviewsCount, bookDate, bookPublisher]
        # sql = """
        #       INSERT INTO books VALUES({0},'{1}','{2}',{3},'{4}','{5}','{6}',{7},{8},{9},'{10}','{11}');
        #
        #     """.format(bookId, bookName, bookAuthor, bookRating, bookIsbn, bookIsbn3, bookLang, bookPages, bookRatingCount, bookTextReviewsCount, bookDate, bookPublisher)
        sql = """INSERT INTO books VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        try:
            cur.execute(sql, newData)

        except:
            print("Failed to insert book.", bookId, bookName)
            conn.rollback()
            traceback.print_exc()
            status = False
        else:
            conn.commit()
    cur.close()
    return status


conn = get_db_connection()
if conn:
    books_exists = check_books_exists(conn)
    cur = get_db_cursor(conn)
    if not books_exists:
        print("Book table does not exist.\n Creating Table")
        dbflag = create_books_table(cur)
    data = get_books_from_csv(cur)
    add_books(conn, data)
