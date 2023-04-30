import { AuthorsRepository } from "../repositories/implementations/AuthorsRepository";
import { NewsRepository } from "../repositories/implementations/NewsRepository";
import { AuthorSigninService } from "../services/AuthorSignin";
import { AuthorSignupService } from "../services/AuthorSignup";
import { CreateNewsService } from "../services/CreateNews";
import { DeleteNewsService } from "../services/DeleteNews";
import { EditNewsService } from "../services/EditNews";
import { FindAuthorByEmailService } from "../services/FindAuthorByEmail";
import { ListNewsService } from "../services/ListNews";
import { ReadOneNewsService } from "../services/ReadOneNews";
import { AuthorSigninController } from "./AuthorSignin";
import { AuthorSignupController } from "./AuthorSignup";
import { CreateNewsController } from "./CreateNewsController";
import { DeleteNewsController } from "./DeleteNewsController";
import { EditNewsController } from "./EditNewsController";
import { FindAuthorByEmailController } from "./FindAuthorByEmail";
import { ListNewsController } from "./ListNewsController";
import { ReadOneNewsController } from "./ReadOneNewsController";

const authorsRepository = new AuthorsRepository()

const authorSignupService = new AuthorSignupService(authorsRepository)
const authorSigninService = new AuthorSigninService(authorsRepository)
const findAuthorByEmailService = new FindAuthorByEmailService(authorsRepository)

const authorSignupController = new AuthorSignupController(authorSignupService)
const authorSigninController = new AuthorSigninController(authorSigninService)
const findAuthorByEmailConttroller = new FindAuthorByEmailController(findAuthorByEmailService)

const newsRepository = new NewsRepository()

const listNewsService = new ListNewsService(newsRepository)
const readOneNewsService = new ReadOneNewsService(newsRepository)
const createNewsService = new CreateNewsService(newsRepository)
const editNewsService = new EditNewsService(newsRepository)
const deleteNewsService = new DeleteNewsService(newsRepository)

const listNewsController = new ListNewsController(listNewsService)
const readOneNewsController = new ReadOneNewsController(readOneNewsService)
const createNewsController = new CreateNewsController(createNewsService)
const editNewsController = new EditNewsController(editNewsService, readOneNewsService)
const deleteNewsController = new DeleteNewsController(deleteNewsService, readOneNewsService)

export {
    authorSignupController,
    authorSigninController,
    findAuthorByEmailConttroller,
    listNewsController,
    readOneNewsController,
    createNewsController,
    editNewsController,
    deleteNewsController
}