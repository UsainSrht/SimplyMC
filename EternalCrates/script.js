const savedColors = ["1"]
const enchants = []

function toggleDiv(id) {
    $('#btn').click(function() {
        $(`#${id}`).toggle();
    });
  }

/* Toggles the number of gradient colors between 2 and 10 based on user input */
function toggleRewards(rewards) {
    let clamped = Math.min(10, Math.max(2, rewards));
    if (rewards == 1 || rewards == '') {
      rewards = getRewards().length;
    } else if (rewards != clamped) {
      $('#numOfColors').val(clamped);
      rewards = clamped;
    }
    const container = $('#rewards');
    console.log(container)
    const Rewards2 = container.find('.reward');
    const number = Rewards2.length;
    if (number > rewards) {
      // Need to remove some colors
      Rewards2.each((index, element) => {
        if (index + 1 > rewards) {
          savedColors[index] = $(element).val();
          $(element).parent().remove();
        }
      });
    } else if (number < rewards) {
      // Need to add some colors
      let template = $('#rewardTemplate').html();
      for (let i = number + 1; i <= rewards; i++) {
        let html = template.replace(/\$NUM/g, i).replace(/\$VAL/g, savedColors[i - 1]);
        container.append(html);
    }
    }
}

function getRewards() {
    const Rewards = $('#rewards').find('.reward');
    const Rewards2 = [];
    Rewards.each((index, element) => {
      const value = $(element).val();
      savedRewards[index] = value;
      Rewards2[index] = convertToRGB(value);
    });
    return Rewards2;
  }

  function getSounds() {
    var url, Sounds;
    url = "/EternalCrates/Sounds.json"
    $.getJSON(url, data => {
        $(data).each(function() {
            Sounds = "<option value=\"" + this.toString() + "\">" + this.toString() + "</option>";
            $('#sounds').append(Sounds);
        });
    });
}

function getMaterials() {
    var url, Enchantments;
    url = "/EternalCrates/Enchantments.json"
    $.getJSON(url, data => {
        $(data).each(function() {
            Enchantments = "<option value=\"" + this.toString() + "\">" + this.toString() + "</option>";
            $('#enchants').append(Enchantments);
        });
    });
}

function getEnchants() {
    var url, Materials;
    url = "/EternalCrates/Materials.json"
    $.getJSON(url, data => {
        $(data).each(function() {
            Materials = "<option value=\"" + this.toString() + "\">" + this.toString() + "</option>";
            $('#materials').append(Materials);
        });
    });
}

function getTextureHead(texture) {
    let baseURL = 'https://www.mc-heads.net/head/%texture%'
    texture = atob(texture)
    texture = JSON.parse(texture)
    let finalURL = baseURL.replace('%texture%', texture.textures.SKIN.url.replace("http://textures.minecraft.net/texture/", ""))
    return finalURL
  }

function setTexture(element, texture) {
    let elem = document.getElementById(element)
    if(texture){
      elem.style.backgroundImage = `url(${getTextureHead(texture)})`
      elem.style.backgroundPosition = 'right'
      elem.style.backgroundRepeat = 'no-repeat'
      elem.style.paddingLeft = '17px'
      elem.style.backgroundSize = '25px'
    }else{
      elem.style.backgroundImage = ""
      elem.style.backgroundPosition = ""
      elem.style.backgroundRepeat = ""
      elem.style.paddingLeft = ""
      elem.style.backgroundSize = ""
    }
}