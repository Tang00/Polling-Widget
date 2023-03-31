DROP DATABASE poll;
CREATE DATABASE poll;
USE poll;

DROP TABLE IF EXISTS Response;
DROP TABLE IF EXISTS Poll;

CREATE TABLE Poll (
    id INT NOT NULL,
    prompt VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Poll (id, prompt) VALUES
    (0, "Which Pokemon is the most efficient for running a power plant?"),
    (1, "How many Voltorbs will you need to catch to fully power the village?"),
    (2, "What's Netflix's best family-friendly animated film?"),
    (3, "Which Drug + Animal Movie Do You Wanna See Next?"),
    (4, "Should you choose me for IGN Code Foo?");


CREATE TABLE Response (
	id INT NOT NULL,
    poll_id INT NOT NULL,
    pos INT NOT NULL,
    response VARCHAR(255) NOT NULL,
    votes INT DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (poll_id) REFERENCES Poll(id)
);

INSERT INTO Response (id, poll_id, pos, response, votes) VALUES
    (0, 0, 0, "Voltorb", 1000),
    (1, 0, 1, "Luxray", 5000),
    (2, 0, 2, "Pichu", 500),
    (3, 0, 3, "Other - tell us in the comments", 100),
    (4, 1, 0, "1", 1),
    (5, 1, 1, "2", 1),
    (6, 1, 2, "3", 1),
    (7, 1, 3, "Other - tell us in the comments", 1),
    (8, 2, 0, "TrollHunters: Rise of the Titans", 0),
	(9, 2, 1, "The Sea Beast", 0),
	(10, 2, 2, "Over the Moon", 0),
	(11, 2, 3, "Pinocchio", 0),
	(12, 2, 4, "The Mitchells vs the Machines", 0),
    (13, 3, 4, "Other - tell us in the comments", 1),
    (14, 3, 0, "Meth Elephant", 1),
	(15, 3, 1, "Weed Whale", 1),
	(16, 3, 2, "Heroin Hippo", 1),
	(17, 3, 3, "Oxy Fox", 1),
    (18, 4, 0, "Yes", 1);

    