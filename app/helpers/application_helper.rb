module ApplicationHelper
  def Star_count number
    string = ''
    if number >= 0.1 && number < 1
      string += "<i class='fas fa-star-half rating'></i>"
    end
    if number >= 1
      string += "<i class='fas fa-star rating'></i>"
    end
    if number >= 1.1 && number < 2
      string += "<i class='fas fa-star-half rating'></i>"
    end
    if number >= 2
      string += "<i class='fas fa-star rating'></i>"
    end
    if number >= 2.1 && number < 3
      string += "<i class='fas fa-star-half rating'></i>"
    end
    if number >= 3
      string += "<i class='fas fa-star rating'></i>"
    end
    if number >= 3.1 && number < 4
      string += "<i class='fas fa-star-half rating'></i>"
    end
    if number >= 4
      string += "<i class='fas fa-star rating'></i>"
    end
    if number >= 4.1 && number < 5
      string += "<i class='fas fa-star-half rating'></i>"
    end
    if number >= 5
      string += "<i class='fas fa-star rating'></i>"
    end
    return string.html_safe
  end
end
