class Api::QuestionsController < ApplicationController
    def index
        # get the query keywords from the url
        query = params[:query] || ''
        # format to use for SQL wildcard 
        condition = '%' + query + '%'
        # SQL injection and make it case insensive
        @questions = Question.includes(:answers).where('LOWER(questions.title) like LOWER(?) or
        LOWER(questions.body) like LOWER(?)', condition, condition)
        render :index 
    end 

    def show 
        @question = Question.includes(:answers).find(params[:id])
        @question = Question.find(params[:id])
        render :show 
    end 

    def create 
        @question = Question.create(question_params)
        @question.user_id = current_user.id 
        if @question.save
            render :show 
        else 
            render json: @question.errors.full_messages, status: 422  
        end 
    end 

    def update
        @question = Question.find(params[:id])
        if @question.update(question_params)
            render :show 
        else   
            render json: @question.errors.full_messages, status: 422
        end 
    end 

    def destroy
        @question = Question.find(params[:id])
    
        if @question.destroy
          render :show
        else
          render json: @question.errors.full_messages, status: 422
        end
    end

    private 
    def question_params
        params.require(:question).permit(:title,:body)
    end 
end
