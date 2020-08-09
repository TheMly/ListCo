CREATE DEFINER=`root`@`localhost` PROCEDURE `spListCo_createTodoList`()
BEGIN
	SET @genId = FLOOR(RAND()*(1000000-1000+1))+1000;
	WHILE ((SELECT COUNT(*) FROM TODO_LIST WHERE ID = @genId) > 0) DO
	BEGIN
		SET @genId =  FLOOR(RAND()*(1000000-1000+1))+1000;
	END;
	END WHILE;

    INSERT INTO TODO_LIST(`id`,`title`,`creation_date`,`update_date`) VALUES(@genId,'MyTitle',now(),now());

    SELECT ID, TITLE, CREATION_DATE, UPDATE_DATE FROM TODO_LIST WHERE id = @genId;
END